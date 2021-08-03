import request from '@/utils/request'

// 查询lib_log列表
export function listLib_log(query) {
    return request({
        url: '/module/lib_log/list',
        method: 'get',
        params: query
    })
}

// 查询lib_log详细
export function getLib_log (id) {
    return request({
        url: '/module/lib_log/edit?id='+id,
        method: 'get'
    })
}


// 新增lib_log
export function addLib_log(data) {
    return request({
        url: '/module/lib_log/add',
        method: 'post',
        data: data
    })
}

// 修改lib_log
export function updateLib_log(data) {
    return request({
        url: '/module/lib_log/edit',
        method: 'post',
        data: data
    })
}

// 删除lib_log
export function delLib_log(ids) {
    return request({
        url: '/module/lib_log/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

