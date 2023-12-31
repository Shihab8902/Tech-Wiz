import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useGetPublic = (queryKey, url) => {
    const axiosPublic = useAxiosPublic();

    const { data, refetch, isPending } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const result = await axiosPublic.get(url);
            return result.data;
        }
    });

    return { data, refetch, isPending };
}

export default useGetPublic