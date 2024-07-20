using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Data.Contracts;
using ToDoApp.Service.Contracts;
using Model = ToDoApp.Models;
using DBModel = ToDoApp.Data.Models;
using Nelibur.ObjectMapper;
using ToDoApp.Service.Config;

namespace ToDoApp.Service.Services
{
    public class TaskService : ITaskService
    {
        private readonly IRepository<DBModel.Task> _taskRepository;

        public TaskService(IRepository<DBModel.Task> taskRepository)
        {
            _taskRepository = taskRepository;
            TinyMapperConfig.Configure();
        }

        public async Task<Model.Task> AddAsync(Model.Task task)
        {
            var dbTask = TinyMapper.Map<DBModel.Task>(task);
            var addedTask = await _taskRepository.AddAsync(dbTask);
            return TinyMapper.Map<Model.Task>(addedTask);
        }

        public async Task<bool> DeleteAsync(string id)
        {
            return await _taskRepository.DeleteAsync(id);
        }

        public async Task<List<Model.Task>> GetAllAsync(string id)
        {
            var tasks = await _taskRepository.GetAllByIdAsync(id);
            return TinyMapper.Map<List<Model.Task>>(tasks);
        }

        public async Task<bool> UpdateAsync(string id, Model.Task task)
        {
            var dbTask = TinyMapper.Map<DBModel.Task>(task);
            var updatedTask = await _taskRepository.UpdateAsync(id, dbTask);
            if(updatedTask != null) return true;
            return false;
        }
    }
}