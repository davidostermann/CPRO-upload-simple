import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { post } from 'axios'

class App extends Component {
  state = {
    file: null,
    url: null
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.state.file
      ? this.fileUpload(this.state.file).then(
          url => url && this.setState({ url, error: null })
        )
      : alert("Vous n'avez pas selectionné de fichier")
  }

  onChange = file => this.setState({ file })

  handleErrors = response => {
    console.log('response : ', response);
    
    if (!response.ok) {
      this.setState({ url: null, error: response.statusText })
    }
    return response
  }

  fileUpload(file) {
    const formData = new FormData()
    formData.append('img', file)
    formData.append('name', file.name)

    // return post('/upload', formData).then(data => data.url)
    return (
      fetch('/upload', { method: 'POST', body: formData })
        // !!! ne pas ajouter de Headers content-type
        .then(this.handleErrors)
        .then(r => r.json())
        .then(data => data.url)
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={e => this.onChange(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        <img src={this.state.url} />
        {this.state.error && <p>coucou error : {this.state.error}</p>}
      </div>
    )
  }
}

export default App
