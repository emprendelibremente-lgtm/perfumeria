import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const FIELDS = [
  "nombre",
  "marca",
  "genero",
  "tipo",
  "descripcion",
  "imagen_url",
  "disponible",
  "tiempo_llegada",
];

function pickFields(body) {
  const data = {};
  for (const field of FIELDS) {
    if (field in body) data[field] = body[field];
  }
  return data;
}

export async function PATCH(request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    console.log("PATCH /api/admin/perfumes - body recibido:", {
      id: body.id,
      nombre: body.nombre,
      marca: body.marca,
      genero: body.genero,
      tipo: body.tipo,
      descripcion: body.descripcion,
      imagen_url: body.imagen_url,
      disponible: body.disponible,
      tiempo_llegada: body.tiempo_llegada,
    });

    const { id } = body;

    if (!id) {
      return Response.json(
        { error: "Falta el id del perfume" },
        { status: 400 }
      );
    }

    const updateData = pickFields(body);

    if ("imagen_url" in updateData) {
      updateData.imagen_url = updateData.imagen_url ?? null;
    }
    if ("tipo" in updateData) {
      updateData.tipo = updateData.tipo ?? null;
    }
    if ("descripcion" in updateData) {
      updateData.descripcion = updateData.descripcion ?? null;
    }
    if ("tiempo_llegada" in updateData) {
      updateData.tiempo_llegada = updateData.tiempo_llegada ?? null;
    }

    const { data, error } = await supabaseAdmin
      .from("perfumes")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("PATCH /api/admin/perfumes - Supabase error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("PATCH /api/admin/perfumes - Unexpected error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from("perfumes")
      .insert(pickFields(body))
      .select()
      .single();

    if (error) {
      console.error("POST /api/admin/perfumes - Supabase error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/perfumes - Unexpected error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return Response.json(
        { error: "Falta el id del perfume" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("perfumes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE /api/admin/perfumes - Supabase error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/admin/perfumes - Unexpected error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
