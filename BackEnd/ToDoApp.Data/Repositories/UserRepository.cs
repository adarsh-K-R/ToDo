using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Data.Context;
using ToDoApp.Data.Contracts;
using ToDoApp.Data.Models;

namespace ToDoApp.Data.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly AppDbContext _appDbContext;
        public UserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<User> AddAsync(User user)
        {
            await _appDbContext.Users.AddAsync(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }

        public Task<bool> DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _appDbContext.Users.ToListAsync();
        }

        public Task<List<User>> GetAllByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateAsync(string id, User entity)
        {
            throw new NotImplementedException();
        }
    }
}