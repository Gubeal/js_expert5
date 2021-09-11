import { 
  describe, 
  test, 
  expect, 
  jest
}  from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
import Routes from './../../src/routes.js'

describe('#FileHelper test suite', () => {
  describe('#getFileStatus', ()=>{
    test('it should return files statuses in correct format', async () => {

      const statMock = {
        dev: 16777220,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 42642020,
        size: 1484297,
        blocks: 2904,
        atimeMs: 1631161007023.912,
        mtimeMs: 1631161004941.8047,
        ctimeMs: 1631161004942.637,
        birthtimeMs: 1631161004934.5432,
        atime: '2021-09-09T04:16:47.024Z',
        mtime: '2021-09-09T04:16:44.942Z',
        ctime: '2021-09-09T04:16:44.943Z',
        birthtime: '2021-09-09T04:16:44.935Z'
      }

    const mockUser = 'celsojunior'
    process.env.USER = mockUser
    const filename = 'file.png'

    jest.spyOn(fs.promises, fs.promises.readdir.name)
      .mockResolvedValue([filename])
    jest.spyOn(fs.promises, fs.promises.stat.name)
      .mockResolvedValue(statMock)

    const result = await FileHelper.getFilesStatus("/tmp")
    const expectedResult = [
      {
        size: "1.48 MB",
        lastModified: statMock.birthtime,
        owner: mockUser,
        file: filename
      },
    ]

    expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
    expect(result).toMatchObject(expectedResult)

    })
  })
})