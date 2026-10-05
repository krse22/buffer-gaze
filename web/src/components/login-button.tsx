import Button from "@/components/button";

export function LoginButton() {
    async function startBufferLogin() {
        window.location.href = '/api/auth/login';
    }

    return (
        <Button onClick={startBufferLogin}>
            Connect <span className="font-semibold underline">buffer.com</span>
        </Button>
    );
}
