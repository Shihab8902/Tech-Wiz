import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const useBlogLatest = () => {

    const axiosPublic = useAxiosPublic();

    const { data: latestBlogs, refetch } = useQuery({
        queryKey: ["latest-blog"],
        queryFn: async () => {
            const result = await axiosPublic.get("/blogs/latest");
            return result.data;
        }
    })


    return { latestBlogs, refetch };
}

export default useBlogLatest