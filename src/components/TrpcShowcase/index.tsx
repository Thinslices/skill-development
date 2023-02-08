import { api } from "../../utils/api";

export const TrpcShowcase: React.FC = () => {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });
  
    return (
        <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
    )
}