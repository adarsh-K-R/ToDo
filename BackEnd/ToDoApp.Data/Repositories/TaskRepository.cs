using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Context;
using ToDoApp.Data.Contracts;
using DBTask = ToDoApp.Data.Models.Task;

namespace ToDoApp.Data.Repositories
{
    public class TaskRepository : IRepository<DBTask>
    {
        private readonly AppDbContext _appDbContext;

        public TaskRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<DBTask> AddAsync(DBTask task)
        {
            await _appDbContext.Tasks.AddAsync(task);
            await _appDbContext.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var task = await _appDbContext.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
            {
                return false;
            }

            task.IsDeleted = true;
            _appDbContext.Tasks.Update(task);
            await _appDbContext.SaveChangesAsync();
            return true;
        }

        public Task<List<DBTask>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<List<DBTask>> GetAllByIdAsync(string id) {
            return await _appDbContext.Tasks
                        .OrderBy(t => t.CreatedOn)
                        .Include(t => t.User)
                        .Where(t => !t.IsDeleted && t.UserId == id)
                        .ToListAsync();
        }

        public async Task<DBTask> UpdateAsync(string id, DBTask task)
        {
            var existingTask = await _appDbContext.Tasks.FirstOrDefaultAsync(t => t.Id == id );
            if (existingTask == null)
            {
                return null!;
            }

            if(task.IsCompleted != existingTask.IsCompleted) {
                existingTask.IsCompleted = task.IsCompleted;
            }
            else {
                existingTask.Details = task.Details;
                existingTask.Name = task.Name;
                existingTask.ModifiedOn = DateTime.UtcNow;
            }

            _appDbContext.Tasks.Update(existingTask);
            await _appDbContext.SaveChangesAsync();
            return existingTask;
        }
    }
}