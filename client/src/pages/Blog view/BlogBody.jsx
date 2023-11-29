

const BlogBody = ({ blog }) => {
    const { body } = blog;
    console.log(body)

    return <div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>



}

export default BlogBody