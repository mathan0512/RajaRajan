import React from 'react'
class Header extends React.Component
{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <nav className="nav">
                    <div className="nav-center">
                        <a className="brand" href="/">
                            Tasks List
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Header