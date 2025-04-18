﻿using EHL.Business.Interfaces;
using EHL.Common.Models;
using InSync.Api.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace EHL.Api.Controllers
{
	[Route("api/[controller]")]
	public class EmerController : ControllerBase
	{
		private readonly IEmerManager _emmerManager;

		public EmerController(IEmerManager emmerManager)
		{
			_emmerManager = emmerManager;
		}
		[HttpGet,Route("wing/{wingId}")]
		public IActionResult GetAllEmer(long wingId)
		{
			return Ok(_emmerManager.GetAllEmer(wingId));
		}
		[HttpGet,Route("mastersheet")]
		public IActionResult GetAllMasterSheet()
		{
			return Ok(_emmerManager.GetAllMasterSheet());
		}
		[HttpGet, Route("latest/emer")]
		public IActionResult GetLatestEmer()
		{
			return Ok(_emmerManager.GetLatestEmer());
		}
		[HttpGet, Route("latest/policy")]
		public IActionResult GetLatestTwoPoliciesPerType()
		{
			return Ok(_emmerManager.GetLatestTwoPoliciesPerType());
		}
		[HttpPost]
		public async Task<IActionResult> AddEmer([FromForm] EmerModel emerModel)
		{
			emerModel.CreatedBy = HttpContext.GetUserId();
			emerModel.CreatedOn = DateTime.Now;
			emerModel.IsActive = true;
			emerModel.IsDeleted = false;

			if (emerModel.EmerFile != null && emerModel.EmerFile.Length > 0)
			{
				using (var memoryStream = new MemoryStream())
				{
					await emerModel.EmerFile.CopyToAsync(memoryStream); // Use `await` for async file copying
					emerModel.FileBytes = memoryStream.ToArray();  // Store file content as byte array
				}
			}

			// Save to database asynchronously
			var result = await _emmerManager.AddEmer(emerModel); // Ensure `AddEmerAsync` is an async method

			return Ok(result);
		}

		[HttpPost, Route("update")]
		public async Task<IActionResult> UpdateEmer([FromForm] EmerModel emerModel)
		{
			emerModel.UpdatedBy = HttpContext.GetUserId();
			emerModel.UpdatedOn = DateTime.Now;
			emerModel.IsActive = true;
			emerModel.IsDeleted = false;
			return Ok(await _emmerManager.UpdateEmer(emerModel));
		}
		
		[HttpDelete,Route("{Id}")]
		public IActionResult DeactivateEmer(long Id)
		{
			return Ok(_emmerManager.DeactivateEmer(Id));
		}
		[HttpDelete]
		public IActionResult Deactivate([FromBody] EmerModel emerModel)
		{
			emerModel.UpdatedBy = HttpContext.GetUserId();
			emerModel.UpdatedOn = DateTime.Now;
			emerModel.IsActive = false;
			emerModel.IsDeleted = true;
			return Ok(_emmerManager.DeactivateEmer(emerModel.Id));
		}
		[HttpGet, Route("index/{wingId}")]
		public IActionResult GetEmerIndex(int wingId)
		{
			return Ok(_emmerManager.GetEmerIndex(wingId));
		}
        [HttpPost, Route("index")]
        public async Task<IActionResult> AddEmerIndex([FromForm] EmerIndex EmerIndex)
        {
            EmerIndex.CreatedBy = HttpContext.GetUserId();
            EmerIndex.CreatedOn = DateTime.Now;
            EmerIndex.IsActive = true;
            EmerIndex.IsDeleted = false;

            if (EmerIndex.EmerFile != null && EmerIndex.EmerFile.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await EmerIndex.EmerFile.CopyToAsync(memoryStream); // Use `await` for async file copying
                    EmerIndex.FileBytes = memoryStream.ToArray();  // Store file content as byte array
                }
            }

            // Save to database asynchronously
            var result = await _emmerManager.AddEmerIndex(EmerIndex); // Ensure `AddEmerAsync` is an async method


            return Ok(result);
        }
		[HttpPost, Route("index/update")]
		public IActionResult UpdateEmerIndex ([FromForm] EmerIndex emerIndex)
        {
            emerIndex.UpdatedBy = HttpContext.GetUserId();
            emerIndex.UpdatedOn = DateTime.Now;
            return Ok(_emmerManager.UpdateEmerIndex(emerIndex));
        }
    }
}
