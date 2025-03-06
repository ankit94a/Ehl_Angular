using EHL.Business.Interfaces;
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
		[HttpGet]
		public IActionResult GetAllEmer()
		{
			return Ok(_emmerManager.GetAllEmer());
		}

		//[HttpPost]
		//public IActionResult AddEmer([FromForm] EmerModel emerModel, [FromForm] IFormFile emerFile)
		//{
		//	emerModel.CreatedBy = HttpContext.GetUserId();
		//	emerModel.CreatedOn = DateTime.Now;
		//	emerModel.IsActive = true;
		//	emerModel.IsDeleted = false;
		//	if (emerFile != null && emerFile.Length > 0)
		//	{
		//		// Convert the file to a byte array
		//		using (var memoryStream = new MemoryStream())
		//		{
		//			emerFile.CopyTo(memoryStream);
		//			emerModel.EmerFile = memoryStream.ToArray();  // Store file content as byte array
		//		}
		//	}
		//	// Save the model to the database
		//	return Ok(_emmerManager.AddEmer(emerModel));
		//}


		[HttpPost, Route("update")]
		public IActionResult UpdateEmer([FromBody] EmerModel emerModel)
		{
			emerModel.UpdatedBy = HttpContext.GetUserId();
			emerModel.UpdatedOn = DateTime.Now;
			return Ok(_emmerManager.UpdateEmer(emerModel));
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
	}
}
