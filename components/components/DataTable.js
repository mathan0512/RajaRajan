import React from 'react';

class DataTable extends React.Component {
    constructor(props) {
        super(props)
        
        // this.state = { TaskData : [] }
        // this.setState({ TaskData : this.props.TaskData })
        console.log(this.props.staticData);
        
    }



    render(){
        return(
            <div>
                <div id="display" className="col-sm-12"> 
                            <table border="1px" className="table">
                                <thead className="table-light">
                                    <tr>
                                        <th>Task Id</th>
                                        <th>Tittle</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                               <tbody>
                                {
                                    this.props.staticData.map((data, ind) => (                                        
                                        <tr  border="1px">
                                            <td>{data.taskid}</td>
                                            <td>{data.tittle}</td>
                                            <td>{data.desc}</td>
                                            <td>{data.date}</td>
                                            <td>
                                                <input type="checkbox" id="" checked={ data.status}  />
                                            </td>
                                            <td><span onClick={this.props.editrow} id={data.taskid}> Edit</span></td>
                                            <td><span onClick={this.props.deleteData} id={data.taskid}> Delete</span></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>  

            </div>
        );
    }

}

export default DataTable;

