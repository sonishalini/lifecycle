import axios from "axios";
import React from "react";


class PostsList extends React.Component{
    state = {
        posts: []
    };

    componentDidMount() {
      const { user } = this.props;  

      this.getUserPostsList(user.id)
    }

    getUserPostsList = (id) => {
        axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(result => {
            this.setState({
                posts: result.data
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Old User", prevProps.user.id);
        console.log("New User", this.props.user.id);
        
        if(prevProps.user.id !== this.props.user.id){
            //call API
            this.getUserPostsList(this.props.user.id)
        }
    }

    render(){
        const { posts } = this.state;
        return(
        <div>
            {posts.map(post =>{
                return (
                <div key={post.id} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text"> {post.body} </p>
                </div>
              </div>
            );             
            } )}
        </div>
        );
    }
}

export default PostsList;