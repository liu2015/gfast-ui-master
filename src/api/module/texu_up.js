import request from '@/utils/request'

// 查询texu_up列表
export function listTexu_up(query) {
    return request({
        url: '/module/texu_up/list',
        method: 'get',
        params: query
    })
}

// 查询texu_up详细
export function getTexu_up (id) {
    return request({
        url: '/module/texu_up/edit?id='+id,
        method: 'get'
    })
}


// 新增texu_up
export function addTexu_up(data) {
    return request({
        url: '/module/texu_up/add',
        method: 'post',
        data: data
    })
}

// 修改texu_up
export function updateTexu_up(data) {
    return request({
        url: '/module/texu_up/edit',
        method: 'post',
        data: data
    })
}

// 删除texu_up
export function delTexu_up(ids) {
    return request({
        url: '/module/texu_up/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

