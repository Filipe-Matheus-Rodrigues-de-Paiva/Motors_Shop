"use server";

import {
  baseUrl,
  createAnnouncementSchema,
  registerSchema,
  updateAddressSchema,
  updateUserSchema,
} from "@/lib/types";
import { verify } from "jsonwebtoken";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSubmit(credentials: unknown) {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    const decoded = verify(
      data.token!,
      process.env.JWT_SECRET!,
      // @ts-ignore
      (err, decoded) => {
        if (err) return err.message;

        return decoded;
      }
    );

    cookies().set("JWT_Token", data.token);

    // @ts-ignore
    if (decoded.account_type === "anunciante") {
      redirect("/dashboard");
    } else {
      redirect("/");
    }
  } else {
    return {
      error: "Credenciais inválidas",
    };
  }
}

export async function handleRegister(data: unknown) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(result.data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 409) {
      return {
        error: "Usuário já cadastrado",
      };
    }
  }
}

export async function deleteCookies() {
  const cookie = cookies();

  cookie.delete("JWT_Token");

  revalidatePath(`${baseUrl}/login`);

  redirect("/");
}

export async function addComment(data: any, id: string) {
  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/comments/announcements/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("comments");
  } else {
    return {
      error: "Erro ao adicionar comentário",
    };
  }
}

export async function deleteComment(id: string) {
  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("comments");
  } else {
    return {
      error: "Erro ao remover comentário",
    };
  }
}

export async function updateComment(data: unknown, id: string) {
  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/comments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("comments");
  } else {
    return {
      error: "Erro ao atualizar comentário",
    };
  }
}

export async function updateUser(data: unknown, id: string) {
  const result = updateUserSchema.safeParse(data);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(result.data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("userInfo");
    return {
      success: "Usuário atualizado com sucesso",
    };
  } else {
    return {
      error: "Erro ao atualizar usuário",
    };
  }
}

export async function deleteUser(id: string) {
  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await deleteCookies();

    revalidateTag("userInfo");
    revalidateTag("announcements");
  } else {
    return {
      error: "Erro ao remover usuário",
    };
  }
}

export async function updateAddress(data: unknown, id: string) {
  const result = updateAddressSchema.safeParse(data);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/address/${id}`, {
    method: "PATCH",
    body: JSON.stringify(result.data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("userInfo");
    return {
      success: "Endereço atualizado com sucesso",
    };
  } else {
    return {
      error: "Erro ao atualizar endereço",
    };
  }
}

export async function addAnnouncement(data: unknown) {
  const result = createAnnouncementSchema.safeParse(data);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/announcements`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidateTag("userAnnouncements");
  } else {
    return {
      error: "Erro ao adicionar anúncio",
    };
  }
}

export async function updateAnnouncement(data: unknown, id: string) {
  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/announcements/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidatePath("/dashboard");
  } else {
    return {
      error: "Erro ao atualizar anúncio",
    };
  }
}

export async function deleteAnnouncement(id: string) {
  const token = cookies().get("JWT_Token")?.value;
  const response = await fetch(`${baseUrl}/announcements/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    revalidatePath("/dashboard");
  } else {
    return {
      error: "Erro ao remover anúncio",
    };
  }
}
