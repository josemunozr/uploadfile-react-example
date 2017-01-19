import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA9oQpQ5JIYPVu9M1a9cKGnn_7dXCC35ZA",
    authDomain: "uploadfile-react-example.firebaseapp.com",
    databaseURL: "https://uploadfile-react-example.firebaseio.com",
    storageBucket: "uploadfile-react-example.appspot.com",
    messagingSenderId: "759322153412"
  }

firebase.initializeApp(config);

class FileUpload extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadValue : 0
    }
  }

  handleOnChange (e) {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref(`pictures/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState({
        uploadValue: percentage
      })
    }, (error) => {
      console.error(error.message)
      this.setState({
        message: `Ha ocurrido un error: ${error.message}`
      })
    }, () => {
      // Upload complete
      this.setState({
        message: 'Archivo subido!',
        picture: task.snapshot.downloadURL
      })
    })
  }

  render () {
    return (
      <div>
        <progress value={this.state.uploadValue} max='100'>
          {this.state.uploadValue} %
        </progress>
        <br />
        <input type='file' onChange={this.handleOnChange.bind(this)} />
        <br />
        {this.state.message}
        <br />
        <br />
        <img width='300' src={this.state.picture} />
      </div>
    )
  }
}

ReactDOM.render( <FileUpload />, document.getElementById('app') )
