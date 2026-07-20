import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createSupabaseAdmin } from "@/lib/supabase/server"

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = createSupabaseAdmin()
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: "reviewed" })
      .eq("id", params.id)

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json(
        { error: "Failed to update submission" },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin update error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
