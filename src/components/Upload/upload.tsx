import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'

import Button from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
//记录文件上传过程中各个状态
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  //上传的几个生命周期
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    //使用state记录文件上传过程中各个状态
    const [fileList, setFileList] = useState<UploadFile[]>([])
    //更新上传状态的方法
    const updateFileList = (updataFile: UploadFile, updateObj: Partial<UploadFile>) => {
        //使用setState的箭头函数写法，获取之前的state状态
        setFileList(preList => {
            return preList.map((file) => {
                //如果找到了目标文件，则更新文件后返回
                if(file.uid === updataFile.uid)
                    return {...file, ...updateObj}
                else{
                    return file
                }
            })
        })
    }

    const handleClick = () => {
        //fileInput.current存在时，响应点击事件
        if(fileInput.current)
        {
            fileInput.current.click()
        }
    }
    //响应上传文件事件
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files){
            return
        }
        uploadFiles(files)
        if(fileInput.current){
            fileInput.current.value = ''
        }
    }

    //单个文件上传过程
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',  //使用时间戳当做id
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])

        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers:{
                //二进制post表单
                'Content-Type': 'multipart/form-data'
            },
            //axios提供的显示上传进度的接口
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage < 100){
                    //更新上传状态
                    updateFileList(_file, { percent: percentage, status: 'uploading'})
                    if(onProgress){
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(res => {
            console.log(res)
            updateFileList(_file, {status: 'success', response: res.data})
            if(onSuccess){
                onSuccess(res.data, file)
            }
            if(onChange){
                onChange(file)
            }
        }).catch(err => {
            console.log(err)
            updateFileList(_file, { status: 'error', error: err})
            if(onError){
                onError(err, file)
            }
            if(onChange){
                onChange(file)
            }
        })
    }

    //上传文件
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            //没有传入上传文件前需要调用的方法时就直接上传文件到接口
            if(!beforeUpload)
                post(file)
            else{
                const result = beforeUpload(file)
                if(result && result instanceof Promise){
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false){
                    post(file)
                }
            }
        })
    }

    console.log(fileList)
    return (
        <div className='my-upload-component'>
            <Button btnType='primary' onClick={handleClick}>Upload File</Button>
            <input className='my-file-input' style={{display: 'none'}} ref={fileInput} type='file' onChange={handleFileChange}></input>
        </div>
    )
}

export default Upload