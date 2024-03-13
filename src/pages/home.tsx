import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getApi } from "../services/axios";



export default function Home() {

    return (
        <div>
            <Table />
        </div>
    )
}