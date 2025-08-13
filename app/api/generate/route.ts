import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try{
        
    }catch(error){
        console.error('Error processing request');
        return NextResponse.json({message : "Failed to process data"},{status : 500})
    }
}