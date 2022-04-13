import React from "react";
import {
    Button
} from 'react-bootstrap'
class ToDoItem extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <p style={styles.p}> ID {this.props.ayam.id}, {this.props.ayam.name}</p>
                <div>
                    <Button variant="success" onClick={this.props.delete} className="me-2">Delete</Button>
                    <Button variant="primary" onClick={this.props.complete} disabled={this.props.ayam.isCompleted}>
                        {this.props.ayam.isCompleted ? "Finished" : "Completed"}
                    </Button>
                </div>
            </div>
        )
    }
}
const styles = {
    container: {
        backgroundColor: 'salmon',
        width: '25vw',
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
        borderRadius: '10px',
        marginBottom: '10px'
    },
    p: {
        margin: '0px'
    }
}
export default ToDoItem