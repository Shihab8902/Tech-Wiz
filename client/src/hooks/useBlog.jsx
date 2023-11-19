import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useBlog = () => {
    const axiosPublic = useAxiosPublic();

    const { data } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const result = await axiosPublic.get("/blogs");
            return result.data;
        }
    });

    return { data };
}

export default useBlog