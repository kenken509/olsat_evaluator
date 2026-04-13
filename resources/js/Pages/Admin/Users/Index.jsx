    import AdminLayout from "../../../Layouts/AdminLayout";
    import { usePage } from "@inertiajs/react";

    export default function Index(){    
        const {headers} = usePage().props
        return (
            <AdminLayout >
                <h1>Users</h1>
                
            </AdminLayout>
        )
    }