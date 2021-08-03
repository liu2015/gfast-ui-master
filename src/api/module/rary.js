import request from '@/utils/request'

// 查询rary列表
export function listRary(query) {
    return request({
        url: '/module/rary/list',
        method: 'get',
        params: query
    })
}

// 查询rary详细
export function getRary (id) {
    return request({
        url: '/module/rary/edit?id='+id,
        method: 'get'
    })
}


// 新增rary
export function addRary(data) {
    return request({
        url: '/module/rary/add',
        method: 'post',
        data: data
    })
}

// 修改rary
export function updateRary(data) {
    return request({
        url: '/module/rary/edit',
        method: 'post',
        data: data
    })
}

// 删除rary
export function delRary(ids) {
    return request({
        url: '/module/rary/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

