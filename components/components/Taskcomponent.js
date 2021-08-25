
import React, { Component } from 'react';
import DataTable from './DataTable';

export default class Taskcomponent extends Component {
    userData;
    constructor(props) {
        super(props);
            this.state = {
            taskid:1,
            tittle: '',
            desc: '',
            date: '',
            status: true,
            edit:'',
            delete:'',
            lastUpdatedId:'',
            TaskData : [],
       

        }
    }
  
    // Form Events
 
    Validate_Forms= (e) =>  {  
        if(this.state.tittle== "" || this.state.desc == "" || this.state.date == "") {
            alert("Form fields should not be empty...!");            
            return false;       
         }        
        return true;    
    }

    ChangeEvent = (e)=> {
        this.setState({[e.target.name]: e.target.value});  
          
    }

    CheckBoxChangeEvent = (e) => {
        this.setState({[e.target.name]: e.target.checked});  
    }

    ClearAllData = (e) => {
        if(true) {
            localStorage.clear();
            alert("All Data are cleared...!");
            this.setState({ TaskData: [] });
        }
    }



    FormSubmitEvent = (e)=> {
        
        if(this.Validate_Forms()) {
            let items = [...this.state.TaskData];

                let i = 1;
                if(localStorage.getItem('tasklistdata') != null) {
                    this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
                    i = this.state.TaskData.length + 1;
                }  

                console.log(this.state);

            items.push({
                    taskid : i,
                    tittle : this.state.tittle,
                    desc : this.state.desc,
                    date : this.state.date,
                    status : this.state.status,
            });

            this.setState({ TaskData: items });
            localStorage.setItem('tasklistdata', JSON.stringify(items));
            this.ClearDefaultALL();
        }

    }

    // React Life Cycle
    componentDidMount() {
        if(localStorage.getItem('tasklistdata') != null) {
            this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
        }
    }

        
    ClearDefaultALL= (e) =>  {
        this.setState({ taskid : 0,tittle : "",desc: "",date : "" });
    }


    deleteData = (e) => {
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            let id = parseInt(e.target.id);
            console.log(e.target.id);
            if(localStorage.getItem('tasklistdata') != null) {
                this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
            }

            let filteredList = this.state.TaskData.filter(x => x.taskid !== id);

            console.log(this.state.TaskData);
            this.setState({ TaskData: filteredList });

            localStorage.setItem('tasklistdata',JSON.stringify(filteredList));

        }
      }
    
    UpdateData = (e) => {
        if(this.Validate_Forms()) {
            let r = window.confirm("Are you sure want to update...! ");
            if(r === true) {
                let id = parseInt(this.state.taskid);
                if(localStorage.getItem('tasklistdata') != null) {
                    this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
                }

                let toUpdateData = this.state.TaskData.map((item) => {    
                    if (item.taskid === this.state.taskid) {
                        item.tittle = this.state.tittle;
                        item.desc = this.state.desc;
                        item.date = this.state.date;
                        item.status = this.state.status;
                    }
                    return item;
                });

                this.setState({ TaskData: toUpdateData });
                
                localStorage.setItem('tasklistdata', JSON.stringify(this.state.TaskData));

                this.ClearDefaultALL();
            }
        }
    }

    ShowAllData = (e) => {

        if(localStorage.getItem('tasklistdata') !== null) {
            this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
        }
        console.log(this.state.TaskData);
    }

    ShowActiveData = (e) => {
        let listData = [];
        if(localStorage.getItem('tasklistdata') !== null) {
            listData  = JSON.parse(localStorage.getItem('tasklistdata'));
        }

        let returnData = listData.filter(w => w.status);
        this.setState({ TaskData : returnData });
    }

    ShowInActiveData = (e) => {
        let listData = [];
        if(localStorage.getItem('tasklistdata') !== null) {
            listData  = JSON.parse(localStorage.getItem('tasklistdata'));
        }

        let returnData = listData.filter(w => !w.status);
        this.setState({ TaskData : returnData });
    }

    editrow = (e) => {
        let r = true;
        console.log(e.target.id);
        if(r === true) {
            let id = parseInt(e.target.id);
            if(localStorage.getItem('tasklistdata') != null) {
                this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
            }

            let returnData;
            let filteredData = this.state.TaskData.map((item) => {    
                if (item.taskid === id) {
                    
                    console.log(item);
                    returnData = item;
                    return returnData;
                }
              });
            this.setState({ taskid : returnData.taskid,tittle: returnData.tittle ,desc: returnData.desc,date : returnData.date,status : returnData.status,TaskData : this.state.TaskData });
        }
    }
    


    render() {
     
        return (
            <div className="container">
                <div className="col-sm-12" > <h1>Task Management</h1> </div>
                <div className="col-sm-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Task Id</label>
                            <div class="col-sm-10">
                            <input type="text" className="form-control" value={this.state.taskid} readonly="readonly" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Tittle</label>
                            <div class="col-sm-10">
                            <input type="text" className="form-control" name="tittle" value={this.state.tittle} onChange={this.ChangeEvent} />
                            </div>
                        </div>
                        <div className="form-group"
                            >
                            <label>Task Description</label>
                            <div class="col-sm-10">
                            <input type="text" className="form-control" name="desc" value={this.state.desc} onChange={this.ChangeEvent} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <div class="col-sm-10">
                            <input type="date" className="form-control" name="date" value={this.state.date} onChange={this.ChangeEvent} />
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Status </label>
                            &emsp;
                            &emsp;
                            
                            <input className="form-check-input" type="checkbox" name="status"  checked={this.state.status} onChange={this.CheckBoxChangeEvent}  />
                        </div> 
                        <br />             
                        
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-primary btn-block" onClick={this.FormSubmitEvent} >Add New</button> 
                            &emsp;
                            &emsp;
                            &emsp;
                            <button type="button" className="btn btn-secondary btn-block" onClick={this.UpdateData} >Update</button> 
                            &emsp;
                            &emsp;
                            &emsp;                            
                            {/* <button onClick={this.addrow} className="btn btn-primary btn-block">ADD</button> */}
                             <button type="button" className="btn btn-success" onClick={this.ShowAllData}> Show all tasks</button> 
                             &emsp;
                             &emsp;
                             &emsp;
                             <button type="button" className="btn btn-danger" onClick={this.ShowInActiveData}> Show Pending tasks</button> 
                             &emsp;
                             &emsp;
                             &emsp;
                             <button type="button" className="btn btn-success" onClick={this.ShowActiveData}> Show completed tasks</button> 
                             &emsp;
                             &emsp;
                             &emsp;
                             &emsp;
                            <button className="btn btn-danger" onClick={this.ClearAllData}>Clear ALL data</button>
                             </div>   
                       
                </form>
                </div>
                <br />

                <DataTable staticData = {JSON.parse(localStorage.getItem('tasklistdata'))} editrow={this.editrow} deleteData={this.deleteData}>

                
                {/* <tbody>
                                {
                                    this.state.TaskData.map((data, ind) => (                                        
                                        <tr  border="1px">
                                            <td>{data.taskid}</td>
                                            <td>{data.tittle}</td>
                                            <td>{data.desc}</td>
                                            <td>{data.date}</td>
                                            <td>
                                                <input type="checkbox" id="" checked={ data.status}  />
                                            </td>
                                            <td><span onClick={this.editrow} id={data.taskid}> Edit</span></td>
                                            <td><span onClick={this.deleteData} id={data.taskid}> Delete</span></td>
                                        </tr>
                                    ))
                                }
                                </tbody> */}
                                </DataTable>
                            </div>
        )
    }
}
