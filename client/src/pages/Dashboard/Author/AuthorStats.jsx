import { useContext } from "react"
import { UserContext } from "../../../context/AuthProvider"
import useGetSecure from "../../../hooks/useGetSecure";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import NoDataLoader from "../../../components/Loader/NoDataLoader";



const AuthorStats = () => {
    const { user } = useContext(UserContext);

    const { data: views, isPending } = useGetSecure(["author-stats", user?.email], `/authorStats?email=${user?.email}`);



    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4CAF50', '#9C27B0'];

    const s = views?.map((view, index) => {
        return {
            name: view?.title,
            value: view?.totalViews,
            color: COLORS[index % COLORS.length],
        };
    });




    return <div className="px-5 py-10 bg-white shadow rounded-lg min-h-screen">

        <h3 className="text-center font-semibold text-xl uppercase mb-10">Estimated views</h3>

        {
            isPending ? <NoDataLoader /> :
                views?.length > 0 ? <div>
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
                                <Tooltip />

                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                    :
                    <div>
                        <h3 className="text-center my-20 text-3xl font-semibold text-gray-400">No data available</h3>
                    </div>
        }

    </div>


}

export default AuthorStats