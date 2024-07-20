using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model = ToDoApp.Models;
using ToDoApp.Service.Contracts;
using System.Security.Claims;

namespace ToDoApp.Api.Controllers
{
    [Route("api/task")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var tasks = await _taskService.GetAllAsync(userId!);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] Model.Task task) 
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            task.UserId = userId;

            try
            {
                await _taskService.AddAsync(task);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] string id,[FromBody] Model.Task task)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            bool res = await _taskService.UpdateAsync(id, task);
            
            if(res)
            {
                return Ok(task);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] string id)
        {
            bool res = await _taskService.DeleteAsync(id);

            if(res)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

    }
}