import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';

import { DefaultResponse } from '../types/DefaultResponse';

const corsPolicy = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {

        await NextCors(req, res, {
            // Options
            methods: ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        return handler(req, res);
    }

export { corsPolicy }