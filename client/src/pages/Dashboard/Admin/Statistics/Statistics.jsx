
import NoDataLoader from "../../../../components/Loader/NoDataLoader";
import useGetPublic from "../../../../hooks/useGetPublic";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from "recharts";


const Statistics = () => {

    const { data: stats, isPending } = useGetPublic(["stats"], `/stats`);



    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4CAF50', '#9C27B0']; //Different colors for each slice



    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };



    const s = stats?.map((stat, index) => {
        return {
            name: stat?._id,
            value: stat?.total,
            color: COLORS[index % COLORS.length], // Use modulo to cycle through the colors
        };
    });






    return <div className="px-5 py-10 bg-white shadow rounded-lg min-h-screen">

        {
            isPending ? <NoDataLoader /> :
                <div>



                    <h3 className="text-center font-semibold text-xl uppercase mb-10">Blogs by category</h3>

                    <div style={{ width: "100%", height: 400 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={s}
                                    fill="#8884d8"
                                    label
                                >
                                    {s.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value, name) => [capitalizeFirstLetter(name), value]}
                                />
                                <Legend
                                    formatter={(value) => capitalizeFirstLetter(value)} // Use custom formatter
                                    verticalAlign="bottom"
                                    height={36}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
        }

    </div>
}

export default Statistics