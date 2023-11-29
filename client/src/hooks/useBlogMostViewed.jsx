
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useBlogMostViewed = () => {

    const axiosPublic = useAxiosPublic();

    const { data: mostViewedBlogs, refetch } = useQuery({
        queryKey: ["mostViewed-blog"],
        queryFn: async () => {
            const result = await axiosPublic.get("/blogs/mostViewed");
            return result.data;
        }
    })


    return { mostViewedBlogs, refetch };
}

export default useBlogMostViewed