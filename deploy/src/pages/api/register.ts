import {signUp} from '../../utils/db/servicefirebase';
import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
    name: string;
    alamat: string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        try {
            await signUp(req.body, (result: {status: string, message: string}) => {
                if (res.writableEnded) {
                    return;
                }

                if (result.status === "success") {
                    res.status(200).json({name: result.message, alamat: ""});
                } else {
                    res.status(400).json({name: result.message, alamat: ""});
                }
            });
        } catch (error) {
            console.error("Register API failed:", error);
            if (!res.writableEnded) {
                res.status(500).json({name: "Registration failed", alamat: ""});
            }
        }
    } else {
        res.status(405).json({name: "Method Not Allowed", alamat: ""});
    }
}