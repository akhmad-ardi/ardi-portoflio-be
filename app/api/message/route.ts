import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { createClient } from "@/utils/supabase/server";
import { messageSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = messageSchema.parse(body);
        
        const supabase = await createClient()
    
        await supabase.from("messages").insert([data])

        return NextResponse.json({ message: "Success to send message" }, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ 
                errors: error.errors.map(err => ({ path: err.path[0], message: err.message })) 
            }, { status: 400 })
        }

        console.error(error)
        return NextResponse.json({ message: "Failed to send message" }, { status: 500 })
    }
}