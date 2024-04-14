import { useFolder } from '@/contexts/useFolder'
import React from 'react'
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
    </div>
  )
}

export default DriveHome