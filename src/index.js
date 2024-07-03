import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.css';


export const DropZone = () => {

  const [files, setFiles] = useState([])
  const [printFiles, setPrintFiles] = useState(false)
  const [existingFilenames, setExistingFilenames] = useState([])

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.filter((file) => !existingFilenames.includes(file.name))

    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    const newFilenames = newFiles.map((file) => file.name)
    setExistingFilenames((prevFilenames) => [...prevFilenames, ...newFilenames])
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleCloseFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name != fileName)
    setFiles(updatedFiles)
  }

  const handleSendData = (e) => {
    setPrintFiles(e.target.checked);
  }


  return (
    <div>
      <div className={styles.container}>
        <div  {...getRootProps()} className={styles.dropZone}>
          <ul>
            {files.map(file => (
              <li onClick={(e) => e.stopPropagation()}>
                <div className={styles.close} onClick={() => handleCloseFile(file.name)}>×</div>
                <img src={URL.createObjectURL(file)} alt={file.name} />
              </li>
            ))}
          </ul>
          {files.length == 0 ? <p>Drag & Drop</p> : null}
        </div>
        <div className={styles.switchRow}>
          <label className={styles.switch}>
            <input type="checkbox" onChange={handleSendData} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>

      {
        printFiles &&
        <div className={styles.table}>
          <table >
            <thead>
              <tr >
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Path</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr>
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                  <td>{file.size}</td>
                  <td>{file.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
