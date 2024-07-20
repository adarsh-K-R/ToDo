using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Model = ToDoApp.Models;
using DBModel = ToDoApp.Data.Models;

namespace ToDoApp.Service.Contracts
{
    public interface ITaskService
    {
        public Task<List<Model.Task>> GetAllAsync(string id);

        public Task<Model.Task> AddAsync(Model.Task task);

        public Task<bool> DeleteAsync(string id);

        public Task<bool> UpdateAsync(string id, Model.Task task);
    }
}