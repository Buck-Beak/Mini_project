"use client"
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContextProvider";

export default function Profile() {
    const {user} = UserAuth();
    return(
        <div className="profile">
            profile
        </div>
    )
}