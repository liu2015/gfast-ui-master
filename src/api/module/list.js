import request from '@/utils/request'

// 查询list列表
export function listList(query) {
    return request({
        url: '/module/list/list',
        method: 'get',
        params: query
    })
}

// 查询list详细
export function getList (id) {
    return request({
        url: '/module/list/edit?id='+id,
        method: 'get'
    })
}


// 新增list
export function addList(data) {
    return request({
        url: '/module/list/add',
        method: 'post',
        data: data
    })
}

// 修改list
export function updateList(data) {
    return request({
        url: '/module/list/edit',
        method: 'post',
        data: data
    })
}

// 删除list
export function delList(ids) {
    return request({
        url: '/module/list/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

