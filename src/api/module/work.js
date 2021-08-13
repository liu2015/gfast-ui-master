import request from '@/utils/request'

// 查询work列表
export function listWork(query) {
    return request({
        url: '/module/work/list',
        method: 'get',
        params: query
    })
}

// 查询work详细
export function getWork (id) {
    return request({
        url: '/module/work/edit?id='+id,
        method: 'get'
    })
}


// 新增work
export function addWork(data) {
    return request({
        url: '/module/work/add',
        method: 'post',
        data: data
    })
}

// 修改work
export function updateWork(data) {
    return request({
        url: '/module/work/edit',
        method: 'post',
        data: data
    })
}

// 删除work
export function delWork(ids) {
    return request({
        url: '/module/work/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

