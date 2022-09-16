import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {storiesOf} from '@storybook/react'
import { Upload } from './upload'

const checkFileSize = (file: File) => {
  //大于500k返回
  if (Math.round(file.size / 1024) > 500) {
    alert('file too big')
    return false;
  }
  return true;
}
//返回重命名后的新文件
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
    return (
      <Upload
        action="http://localhost:6006/upload/posts/"
        onProgress={action('progress')}
        onSuccess={action('success')}
        onError={action('error')}
        onChange={action('change')}
        beforeUpload={checkFileSize}
      />
    )
  }
  
  storiesOf('Upload component', module)
    .add('Upload', SimpleUpload)