"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            const {data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

            if (data) {
                console.log("User:", data);
                router.push('/');
                // Handle successful login, e.g., redirect to dashboard
            }

            if (error) {
                console.log("Error:", error.message);
                // Handle login error
            }
        } catch (error) {
            console.error("Error:", error.message);
            // Handle unexpected errors
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form onSubmit={login} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={handleChange}
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={handleChange}
                />
                <button type="submit" className="bg-btn-background hover:bg-btn-background-hover text-foreground rounded-md px-4 py-2">Log in</button>
            </form>
        </div>
    );
}
