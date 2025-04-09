using EHL.Business.Interfaces;
using EHL.Common.Models;
using EHL.DB.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EHL.Business.Implements
{
	public class EmerManager : IEmerManager
	{
		private readonly IEmerDB _emerDb;
		public EmerManager(IEmerDB emerDB)
		{
			_emerDb = emerDB;
		}
		public List<EmerModel> GetAllEmer(long wingId)
		{
			return _emerDb.GetAllEmer(wingId);
		}
		public List<EmerModel> GetAllMasterSheet()
		{
			return _emerDb.GetAllMasterSheet();
		}
		public List<EmerModel> GetLatestEmer()
		{
			return _emerDb.GetLatestEmer();
		}
		public async Task<bool> AddEmer(EmerModel emer)
		{
			try
			{

				if (emer.EmerFile != null && emer.EmerFile.Length > 0)
				{
					string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "emer");
					string filePath = Path.Combine(uploadsFolder, emer.EmerFile.FileName);
					// Ensure the directory exists
					if (!Directory.Exists(uploadsFolder))
					{
						Directory.CreateDirectory(uploadsFolder);
					}

					emer.FileName = emer.EmerFile.FileName;
					emer.FilePath = emer.FileName;
					// Save the file locally
					using (var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
					{
						await emer.EmerFile.CopyToAsync(fileStream);
					}
				}

				return _emerDb.AddEmer(emer);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error: {ex.Message}");
				throw new Exception("Error while adding the EmerModel data.", ex);
			}
		}

		// Helper function to convert IFormFile to byte array
		private byte[] ConvertToByteArray(IFormFile file)
		{
			using (var memoryStream = new MemoryStream())
			{
				file.CopyTo(memoryStream);
				return memoryStream.ToArray();
			}
		}


		public bool UpdateEmer(EmerModel emer)
		{
			return _emerDb.UpdateEmer(emer);
		}
		public bool DeactivateEmer(long Id)
		{
			return _emerDb.DeactivateEmer(Id);
		}
	}
}
