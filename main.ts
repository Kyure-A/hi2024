import { toHashString } from "https://deno.land/std@0.188.0/crypto/to_hash_string.ts";
import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

// https://qiita.com/access3151fq/items/70790efefc5d0d69870e
const encoder = new TextEncoder();
async function encodeSha256(input: string): Promise<string> {
    const data = encoder.encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return toHashString(digest);
}

export const genStr = (num: [number, number, number]) => {
    const str = "HI2024_" + num[0].toString() + num[1].toString() + num[2].toString();
    return str;
}

export const validSha256 = (str: string) => {
    return str === "18e9a5fb011ad006a4a7a69cf712b6b251deace21ec90c452a2b082ea2c880b3";
}

export const validBase64 = (str: string) => {
    return str === "SEkyMDI0XzUwNQ==";
}

export const calc = async () => {
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            for (let k = 0; k <= 9; k++) {
                const str = genStr([i, j, k]);
                
                if (validSha256(await encodeSha256(str)) || validBase64(encodeBase64(str))) {
                    console.log("BINGO! String is " + str);
                }
            }
        }
    }
}

if (import.meta.main) {
    calc();
}
