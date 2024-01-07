
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useGetSecure = (queryKey, url) => {
    const axiosSecure = useAxiosSecure();

    const { data, refetch, isPending } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const result = await axiosSecure.get(url);
            return result.data;
        }
    });

    return { data, refetch, isPending };
}

export default useGetSecure