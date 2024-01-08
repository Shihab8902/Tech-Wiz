import PropTypes from 'prop-types';
const SectionTitle = ({ title }) => {
    return (
        <div className="flex items-center">
            <div className="mr-4">
                <p className="text-xl uppercase font-bold text-gray-800">{title}</p>
            </div>
            <div className="flex-1 border-t-2 border-gray-300"></div>
        </div>
    )


}

SectionTitle.propTypes = {
    title: PropTypes.string
};




export default SectionTitle