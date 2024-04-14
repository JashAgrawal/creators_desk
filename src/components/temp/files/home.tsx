import React from 'react'
import { useFolder } from '@/contexts/useFolder'
import { useLocation, useParams } from 'react-router-dom'
import { CreateFolder } from './createFolder'

const DriveHome = () => {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  return (
    <div>
       <div className="d-flex align-items-center">
          {/* <FolderBreadcrumbs currentFolder={folder} /> */}
          {/* <AddFileButton currentFolder={folder} /> */}
          <CreateFolder currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder:any) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                {/* <Folder folder={childFolder} /> */}
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile:any) => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                {/* <File file={childFile} /> */}
              </div>
            ))}
          </div>
        )}
      
    </div>
  )
}

export default DriveHome