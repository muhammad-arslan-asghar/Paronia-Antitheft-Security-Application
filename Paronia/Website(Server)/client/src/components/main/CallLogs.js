import React, { Component } from 'react'
import axios from 'axios';
// const path = require('path');

 class CallLogs extends Component {
    state={
        productImage:'',
        records:[]
    };


    componentDidMount=()=>{
        this.getimages();
    }

    getimages=()=>{
        axios.get('/api/uploads/photo').then((res)=>{
            const data=res.data;
            this.setState({records:data});
            console.log('Data has received')})
        .catch(()=>{})

    }
    diplayimage=(posts)=>(
        <div>
            { posts.map((post, i)=>{

                return (
                   
                   <div key={i}>
                        {/* { <img src={'http://localhost:5000/'+ post.productImage } alt="Smiley face"  />  } */}
                    <p>{post.productImage}</p>
                </div>
                )
                
            })}
        </div>
            
        
    );
        
            //if(!posts.length) return <div>Null</div>;


        // return posts.map((post,index)=>(
        //       <div key={index}>
        //           <img src={post.productImage} alt="Smiley face"></img>
        //         <p> 'WOW'+{post.productImage}</p>
        //         <h1>Here Images</h1>
        //      </div>
            
        // ));
    


    render() {
        return (
            <div>
                <h1 style={{ marginLeft: '86px' }}>Call logs</h1>
                <h1 style={{ marginLeft: '86px' }}>Call logs</h1>
              <div style={{ marginLeft: '86px' }}>  "WOW"+{this.diplayimage(this.state.records)} </div>
            </div>
        )
    }
}
export default CallLogs;