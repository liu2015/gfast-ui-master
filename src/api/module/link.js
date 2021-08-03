import request from '@/utils/request'

// 查询link列表
export function listLink(query) {
    return request({
        url: '/module/link/list',
        method: 'get',
        params: query
    })
}

// 查询link详细
export function getLink (id) {
    return request({
        url: '/module/link/edit?id='+id,
        method: 'get'
    })
}


// 新增link
export function addLink(data) {
    return request({
        url: '/module/link/add',
        method: 'post',
        data: data
    })
}

// 修改link
export function updateLink(data) {
    return request({
        url: '/module/link/edit',
        method: 'post',
        data: data
    })
}

// 删除link
export function delLink(ids) {
    return request({
        url: '/module/link/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

