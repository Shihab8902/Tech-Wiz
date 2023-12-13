import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet';
import './blogBody.css';
import { useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import RelatedPosts from './RelatedPosts';
import Comments from './Comments';



const BlogBody = ({ blog }) => {
    const { body, title, totalViews, _id } = blog;
    const axiosPublic = useAxiosPublic();
    const newView = totalViews + 1;

    useEffect(() => {
        axiosPublic.put(`/updateView?id=${_id}`, { view: newView })

    }, [newView, _id, axiosPublic])

    const cleanHTML = DOMPurify.sanitize(body);

    return <div>
        <Helmet>
            <title>{title}</title>
        </Helmet>


        <div className='hyperlink text-justify' dangerouslySetInnerHTML={{ __html: cleanHTML }} />

        <RelatedPosts blog={blog} />
        <Comments blog={blog} />

    </div>



}

export default BlogBody