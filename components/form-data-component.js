import React, { Component } from 'react';

export default class FormDataComponent extends Component {

    userData;

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:0,
            name: '',
            email: '',
            phone: '',
            status:'',
            lastUpdatedId:''
        }
    }

    // Form Events
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePhone(e) {
        this.setState({ phone: e.target.value })
    }
    onChangeStatus(e){
        this.setState({ status: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({id:this.state.id + 1});
        localStorage.setItem(this.state.lastUpdatedId, JSON.stringify(this.state));
        localStorage.setItem('lastUpdatedId', +(this.state.lastUpdatedId) + 1);

        // this.setState({
        //     //id:0,
        //     name: '',
        //     email: '',
        //     phone: '',
        //     status:''
        // })
    }

    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));

        if(localStorage.getItem('lastUpdatedId')){
            this.state.lastUpdatedId = localStorage.getItem('lastUpdatedId');
        }else{
            localStorage.setItem('lastUpdatedId',0);
        }

        if (localStorage.getItem('user')) {
            this.setState({
                id:this.userData.id,
                name: this.userData.name,
                email: this.userData.email,
                phone: this.userData.phone,
                status:this.userData.status
            })
        } else {
            this.setState({
                id:0,
                name: '',
                email: '',
                phone: '',
                status:''
            })
        }
    }

    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem(this.state.lastUpdatedId, JSON.stringify(nextState));
    //     localStorage.setItem('lastUpdatedId', +(this.state.lastUpdatedId) + 1);
    // }

    addrow(){
       let lastupdatedId = localStorage.getItem('lastUpdatedId');
       console.log(lastupdatedId);
        let tableArray = [];
        for(let i=0;i<lastupdatedId;i++){
            console.log('inside for loop');
            //alert('insdie for loop');
            console.log((JSON.parse(localStorage.getItem(i))));
            if(JSON.parse(localStorage.getItem(i)) != null){
                tableArray[i] = JSON.parse(localStorage.getItem(i));
            }
        }
        console.log(tableArray);
        //alert('before filter');
        // tableArray = tableArray.filter((val)=>{
        //     console.log('inside filter');
        //     console.log(val);
        //     return val != null ? true : false;
        // });
        //alert('after filter');
        console.log(tableArray);
        return tableArray.map((val,index)=>{
                console.log(val);
                return (<tr>
                    <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>{val.status}</td>
                </tr>);
        });
       // this.userData = JSON.parse(localStorage.getItem('user'));

    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Id</label>
                        <input type="text" className="form-control" value={this.state.id} readOnly="readonly" />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <input type="text" className="form-control" value={this.state.status} onChange={this.onChangeStatus} />
                    </div>                    
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <button onClick={this.addrow} className="btn btn-primary btn-block">ADD</button>
                </form>

                <table>
                    <thead></thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>EmailID</th>
                    <th>Phone</th>
                    <th>Status</th>
                    </tr>
                    <tbody>
                       {this.addrow()}
                    </tbody>
                </table>
            </div>
        )
    }
}